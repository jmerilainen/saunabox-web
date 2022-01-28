import { Link, useLoaderData } from "remix";
import { getAllSaunas,  } from "~/models/sauna";
import type { Sauna } from "~/models/sauna";
import App from "~/components/App";

export const loader = () => {
  return getAllSaunas();
};

export default function Index() {
  const items = useLoaderData<Sauna[]>();

  return (
    <App>
      <App.Sidebar>
        <div className="grid gap-4">
          {items.map((item) => (
            <div className="relative p-4 rounded bg-slate-100" key={item.slug}>
              <div className="grid">
                <div className="font-bold text-slate-700">
                    <Link to={`/sauna/${item.slug}`} className="stretched">
                      {item.title}
                    </Link>
                </div>
                <div className="text-sm text-slate-600">
                  Avoinna
                </div>
              </div>
            </div>
          ))}
        </div>
      </App.Sidebar>
      <App.Main>
        Valitse Sauna
      </App.Main>
    </App>
  );
}
