import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import formatTimeLength from "@/lib/utils/formatTimeLength";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import getShareUrl from "@/lib/utils/getShareUrl";
import { Loader2, Share2 } from "lucide-react";
import shareImage from "@/lib/utils/shareImage";
import { trackEvent } from "@/lib/analytics";
import Projects from "@/components/Projects";
import { round } from "@/lib/utils";

function Roundup({ statistics }: WrappedSlideProps) {
  const [isLoadingShareImage, setIsLoadingShareImage] = React.useState(false);

  const { amount: totalDeliveryTimeAmount, unit: totalDeliveryTimeUnit } =
    formatTimeLength(statistics.deliveryTime.totalDeliveryTime ?? 0);
  const { amount: averageDeliveryTimeAmount, unit: averageDeliveryTimeUnit } =
    formatTimeLength(statistics.deliveryTime.averageDeliveryTime ?? 0);

  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <div className="md:p-12">
        <h1 className="text-2xl font-black text-starship-400 animate-in slide-in-from-bottom fade-in duration-1000 pb-12">
          And you did so much more...
        </h1>

        <div className="w-4xl dark text-zinc-200 text-left">
          <Table className="w-full">
            <TableBody>
              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Basics</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Total orders</TableCell>
                <TableCell>{statistics.basics.totalOrders}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Total price</TableCell>
                <TableCell>${round(statistics.basics.totalAmount)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Total products</TableCell>
                <TableCell>{statistics.basics.totalProducts}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Total stores</TableCell>
                <TableCell>{statistics.basics.totalStores}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Delivery time</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Total delivery time
                </TableCell>
                <TableCell>
                  {totalDeliveryTimeAmount} {totalDeliveryTimeUnit}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Average delivery time
                </TableCell>
                <TableCell>
                  {averageDeliveryTimeAmount} {averageDeliveryTimeUnit}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Top category</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Name</TableCell>
                <TableCell>{statistics.topCategory.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Orders</TableCell>
                <TableCell>{statistics.topCategory.times}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Total price</TableCell>
                <TableCell>
                  ${round(statistics.topCategory.totalPrice)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Top store</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Name</TableCell>
                <TableCell>{statistics.topStore.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Orders</TableCell>
                <TableCell>{statistics.topStore.times}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Total price</TableCell>
                <TableCell>${round(statistics.topStore.totalPrice)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">
                    Most active weekday
                  </strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Weekday</TableCell>
                <TableCell>{statistics.mostActiveWeekday.weekday}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Orders</TableCell>
                <TableCell>{statistics.mostActiveWeekday.times}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Button
            onClick={async () => {
              setIsLoadingShareImage(true);

              const url = getShareUrl(statistics);
              await shareImage(url);
              trackEvent("share_image");

              setTimeout(() => {
                setIsLoadingShareImage(false);
              }, 1000);
            }}
            className="mt-12 w-full"
            disabled={isLoadingShareImage}
          >
            {isLoadingShareImage ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <Share2 className="inline-block mr-2" size={16} />
                Share image
              </>
            )}
          </Button>

          <Projects />
        </div>
      </div>
    </WrappedContainer>
  );
}

export default Roundup;
