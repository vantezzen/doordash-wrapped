import Wrapped from "./Wrapped";
import JSZip from "jszip";
import * as Sentry from "@sentry/nextjs";
import debugging from "debug";
import { parse as parseCsv } from "papaparse";
import { Order, OrderDetails, OrdersSchema } from "./types";
import { trackEvent } from "./analytics";
const debug = debugging("WrappedCreator");

export default class WrappedCreator {
  fromFile(file: File): Promise<Wrapped> {
    return new Promise((resolve, reject) => {
      Sentry.setContext("file", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      debug("Reading file", file.name, file.size, file.type);

      if (
        [
          "application/zip",
          "application/x-zip-compressed",
          "multipart/x-zip",
          "application/x-compressed",
        ].includes(file.type) ||
        file.name.endsWith(".zip")
      ) {
        debug("File is ZIP");
        this.fromZip(file).then(resolve).catch(reject);
      } else {
        debug("File is CSV");
        this.fromCsv(file).then(resolve).catch(reject);
      }
    });
  }

  private fromCsv(file: File, isRetry = false): Promise<Wrapped> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          try {
            debug("Parsing CSV", (e.target.result as string)?.length);
            const userData = this.parseExport(e.target.result as string);
            debug("Parsed CSV");
            resolve(new Wrapped(userData));
          } catch (e) {
            debug("Failed to parse CSV", e);
            Sentry.captureException(new Error("Cannot read CSV file"), {
              extra: {
                originalException: e,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
              },
            });
            if (!isRetry) {
              this.fromZip(file, true).then(resolve).catch(reject);
            } else {
              reject(e);
            }
          }
        } else {
          debug("Failed to read file");
          reject(new Error("Failed to read file"));
        }
      };
      reader.readAsText(file);
    });
  }

  private async fromZip(file: File, isRetry = false): Promise<Wrapped> {
    try {
      debug("Reading ZIP file", file.name, file.size, file.type);
      const zip = new JSZip();
      await zip.loadAsync(file);

      debug("Loading consumer_order_details.csv");
      let csvContent = "";
      if (zip.files["consumer_order_details.csv"]) {
        csvContent = await zip.files["consumer_order_details.csv"].async(
          "string"
        );
      } else {
        debug(
          "consumer_order_details.csv not found in the ZIP file.",
          zip.files
        );
        trackEvent("no_consumer_order_details_csv");
        trackEvent("zip:" + Object.keys(zip.files).join(","));
        throw new Error(
          "consumer_order_details.csv not found in the ZIP file."
        );
      }

      debug(
        "Parsing CSV from ZIP",
        csvContent.length,
        csvContent.substring(0, 1000)
      );
      const userData = this.parseExport(csvContent);
      return new Wrapped(userData);
    } catch (e) {
      debug("Failed to read ZIP file", e);
      Sentry.captureException(new Error("Cannot read ZIP file"), {
        extra: {
          originalException: e,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        },
      });

      if (!isRetry) {
        return await this.fromCsv(file, true);
      } else {
        throw e;
      }
    }
  }

  forDemoMode(): Wrapped {
    const wrapped = new Wrapped({} as any);
    wrapped.demoMode = true;
    return wrapped;
  }

  private parseExport(textData: string) {
    // Parse CSV
    debug("Parsing CSV");
    const csvData = parseCsv<OrderDetails>(textData, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase(),
    }).data;

    const cutoffDate = new Date();
    cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);

    let orders: Order[] = [];
    let currentOrder: Order | null = null;
    for (const row of csvData) {
      const currentItemCreatedAt = new Date(row.created_at);
      const currentItemDeliveryTime =
        row.delivery_time && row.delivery_time.length > 5
          ? new Date(row.delivery_time)
          : undefined;

      if (
        currentOrder === null ||
        currentOrder.createdAt.getTime() !== currentItemCreatedAt.getTime()
      ) {
        // Start a new order
        if (currentOrder !== null) {
          orders.push(currentOrder);
        }

        currentOrder = {
          storeName: row.store_name,
          totalPrice: 0,
          createdAt: currentItemCreatedAt,
          deliveryTime: currentItemDeliveryTime,
          items: [],
        };
      }
      currentOrder.items.push({
        name: row.item,
        category: row.category,
        unitPrice: row.unit_price,
        quantity: row.quantity,
        subtotal: row.subtotal,
      });
      currentOrder.totalPrice += row.subtotal;
    }
    if (currentOrder !== null) {
      orders.push(currentOrder);
    }

    // Filter out orders that are too old
    orders = orders.filter((order) => order.createdAt > cutoffDate);

    debug("Transformed data", orders);
    return OrdersSchema.parse(orders);
  }
}
