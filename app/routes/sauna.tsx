import { json, Link, LoaderFunction, Outlet, useLoaderData, useLocation, useOutletContext, useParams, useTransition } from "remix";
import { api } from "~/models/sauna";
import type { Sauna } from "~/models/sauna";
import App from "~/components/App";
import { useMap } from "react-map-gl";
import Container from "~/components/Container";

interface LoaderData {
  saunas: Sauna[];
}

interface ContextType {
  saunas: Sauna[];
};


export const loader: LoaderFunction = async () => {
  const saunas = await api.saunas();

  return json<LoaderData>({
    saunas
  });
};


export default function SaunaIndex() {
  const { saunaId } = useParams();
  const { saunas } = useLoaderData<LoaderData>();

  let location = useLocation();
  let transition = useTransition();
  let changingDays =
    transition.location &&
    transition.location.pathname.split("/").slice(-1)[0] !==
      location.pathname.split("/").slice(-1)[0];


  const outletContext: ContextType = {
    saunas,
  }

  const { map } = useMap();

  return (
    <App>
      <Container>
        <div className="flex gap-4">
      <App.Sidebar>
        <div className="grid gap-4">
          {saunas.map((item) => (
            <div className={`relative p-4 transition rounded bg-slate-100 text-slate-700  ${saunaId === item.slug ? 'bg-slate-200 dark:bg-slate-800 dark:text-white' : 'hover:bg-slate-200 dark:hover:bg-white'}`} key={item.slug}>
              <div className="grid">
                <div className="font-bold ">
                  {saunaId === item.slug
                    ? <div>{item.name}</div>
                    : <Link to={`/sauna/${item.slug}`} className="stretched"
                      onMouseEnter={() => map ? map.flyTo({ center: [item.location.longitude, item.location.latitude], zoom: 14}) : null}
                      onMouseLeave={() => map ? map.flyTo({ center: [24.77174979823459, 60.153623149473916], zoom: 12}) : null}
                    >
                      {item.name}
                    </Link>
                  }
                </div>
                <div className="text-sm text-slate-600">
                  Open
                </div>
              </div>
            </div>
          ))}
        </div>
      </App.Sidebar>
      <App.Main>
        <div className={ changingDays ? 'opacity-30' : ''}>
          <Outlet context={outletContext} />
        </div>
      </App.Main>
      </div>
      </Container>
    </App>
  );
}

export function useParentData() {
  return useOutletContext<ContextType>();
}

export function ErrorBoundary({ error }: {error: any}) {
  console.error(error);
  return (
    <App>
      <App.Sidebar>

      </App.Sidebar>
      <App.Main>
        <div className="p-4 bg-red-100 border border-red-200 rounded">
          Error
        </div>
      </App.Main>
    </App>
  );
}