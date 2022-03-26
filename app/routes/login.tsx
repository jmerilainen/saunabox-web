import App from "~/components/App";
import Container from "~/components/Container";

export default function Login() {
    return (
        <App>
            <Container>
                <div className="flex justify-center w-full py-32">
                    <div className="w-full max-w-sm p-8 border rounded shadow bg-slate-200">
                        <div className="grid gap-4">
                            <input type="text" className="w-full p-2 border rounded" placeholder="Phone or email" />
                            <button className="inline-block px-4 py-2 rounded opacity-50 bg-slate-900">
                                Login coming later...
                            </button>
                        </div>

                    </div>
                </div>
            </Container>
        </App>
    )
}