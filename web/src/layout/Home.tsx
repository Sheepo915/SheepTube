import { ContentContainer } from "../components/content/ContentContainer";
import { CategoryContainer } from "../components/category/CategoryContainer";
import { testCategory, testContents } from "../test/data";

export function Home() {
  return (
    <main className="overflow-x-hidden px-8 pb-4 | bg-neutral-800">
      <CategoryContainer categoryList={testCategory} />
      <ContentContainer contentList={testContents} />
    </main>
  );
}
