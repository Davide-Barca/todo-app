// Custom Types
type PageParams = {
  id: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

// Main Component
export default async function ListPage({ params }: PageProps) {
  const { id } = await params;

  return <h1>List {id}</h1>;
}
