import { SidebarMenu } from "@/components/ui/sidebar";
import SidebarButton from "./SidebarButton";
import { getUserLists } from "@/feature/list/actions/get";

export default async function SidebarUserLists() {
  const lists = await getUserLists();

  if (!lists || lists.length === 0) {
    return (
      <SidebarMenu>
        <p className="p-4 text-sm text-muted-foreground">No lists found!</p>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      {lists.map(({ id, title }) => (
        <SidebarButton key={id} id={id} href={`/list/${id}`} name={title} />
      ))}
    </SidebarMenu>
  );
}
