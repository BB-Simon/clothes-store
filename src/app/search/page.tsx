import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultText = products.length === 1 ? "result" : "results";
  return (
    <div className="p-4">
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? "There are no products that match the search"
            : `Showing ${products.length} ${resultText} for`}
          <span className="">{searchValue}</span>
        </p>
      ) : null}

      {products.length > 0 ? (
        <Grid className="grid-cols-1 md:grid-cols-4">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </div>
  );
}
