import { Fragment, useState } from "react";
import { Link, LoaderFunction, Outlet, useLoaderData, useOutletContext, useParams } from "remix";
import App from "~/components/App";
import { getSauna, Sauna } from "~/models/sauna";
import { getAllSlotsForSauna, Slot } from "~/models/slot";

type LoaderData = {
  sauna: Sauna | null
};

type ContextType = {
  sauna: Sauna | null,
  slot: Slot
};

export const loader: LoaderFunction = ({ params }): LoaderData => {
  const slug = params.saunaId;

  if (! slug) {
    throw new Error("Sauna not found ");
  }

  return {
    sauna: getSauna(slug),
  };
}

export default function Sauna() {
  const items: Slot[] = getAllSlotsForSauna();
  const { sauna } = useLoaderData<LoaderData>();

  if (! sauna) {
    throw new Error("Not exists");
  }

  let { slug, saunaId } = useParams();

  return (
    <App>
      <App.Sidebar>
        <div className="grid gap-4">
          <Link to=".." className="p-4 rounded bg-slate-500 text-slate-100">
            Takaisin | {sauna.title}
          </Link>
          <div className="relative grid gap-4">
            <div className="sticky top-0 z-10 p-4 font-bold bg-white shadow-lg">
              La 27.1.2022
            </div>
            <div className="grid gap-4">
              {items.map((item) => {
                return slug == item.id
                ? <div className={`relative`} key={item.id}>
                      <div className="grid p-4 rounded-t bg-sky-600">
                        <div className={`font-bold text-white`}>
                          {item.time}
                        </div>
                      </div>
                      <div className="p-4 border-2 rounded-b border-sky-600">
                        <Outlet context={{sauna, slot: item}} />
                      </div>
                    </div>
                : item.isAvilable
                ? <div className={`relative p-4 rounded transition  ${slug == item.id ? 'bg-slate-500 text-slate-100' : 'bg-slate-100 hover:bg-slate-200'}`} key={item.id}>
                      <div className="grid">
                        <div className={`font-bold ${slug == item.id ? 'text-white' : 'text-slate-800'}`}>
                          <Link to={`slot/${item.id}`} className="stretched">
                            {item.time}
                          </Link>
                        </div>
                        <div className={`text-sm ${slug == item.id ? 'text-white' : 'text-slate-600'}`}>
                          Vapaa
                        </div>
                      </div>
                    </div>
                  : <div className={`relative p-4 rounded bg-red-200`} key={item.id}>
                      <div className="grid">
                        <div className={`font-bold text-white`}>
                          {item.time}
                        </div>
                      </div>
                    </div>
              })}
            </div>
          </div>
        </div>
      </App.Sidebar>
      <App.Main>
        {slug ? '' : 'Varaa aika'}
      </App.Main>
    </App>
  );
}

export function useSauna() {
  return useOutletContext<ContextType>();
}