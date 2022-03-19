import { Link, useLoaderData } from "remix";
import { api } from "~/models/sauna";
import type { Sauna } from "~/models/sauna";
import MyMap from "~/components/Map";
import App from "~/components/App";
import Container from "~/components/Container";

export const loader = async () => {
  return await api.saunas();
};

export default function Index() {
  const items = useLoaderData<Sauna[]>();

  return (
    <App>
      <Container>
        <div className="relative py-32">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            {/* <img className="object-cover w-full h-full" src="/images/brian-patrick-tagalog-_8hGFBxWD0A-unsplash.jpg" alt="" /> */}
          </div>
          <div className="relative px-8">
            <div className="w-full max-w-4xl mx-auto">
              <div className="flex gap-4">
                <div className="w-1/2 py-32 space-y-4">
                  <div className="relative">
                    <div className="invisible font-bold font-display text-7xl" aria-hidden="true">SaunaBox</div>
                    <div className="absolute top-0 left-0 font-bold text-7xl tracking-wideer font-display mix-blend-difference transform-gpu">
                      SaunaBox
                    </div>
                  </div>
                  <p className="text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, voluptas earum. Soluta cupiditate, maiores harum distinctio veniam sequi illo. Odio exercitationem aut nisi pariatur repellendus magni ducimus. Voluptatum, assumenda delectus?</p>
                  <Link to="/sauna" className="py-2 px-4 rounded bg-[#595959] text-white inline-block">
                    Get acccess
                  </Link>
                </div>
                <div className="w-1/2 shrink-0">
                  <img src="/images/atle-mo-ibqEcam6ns4-unsplash.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="relative text-[#080D21] dark:bg-[#080D21]">
          <div className="absolute inset-0 z-10 pointer-events-none bg-easing-b-map dark:bg-easing-b-map-dark"></div>
          <MyMap id="index" markers={items.map(sauna => sauna.cooridinates)} />
        </div>
    </App>
  )
}
