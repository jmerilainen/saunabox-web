import App from "~/components/App";
import Container from "~/components/Container";

export default function Login() {
    return (
        <App>
            <Container>
                <div className="flex justify-center w-full py-32">
                    <div className="w-full max-w-sm p-8 border rounded shadow">
                        <div className="grid gap-4">
                            <input type="text" className="w-full p-2 border rounded" placeholder="Phone or email" />
                            <button className="inline-block px-4 py-2 bg-[#f2ecd7] rounded opacity-50">
                                Login coming later...
                            </button>
                        </div>

                    </div>
                </div>
            </Container>
        </App>
    )
}