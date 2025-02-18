import Header from "../../Sections/Header/Header";
import Heading from "../UI/Heading/Heading";

export default function TicketGenerator() {
    return (
        <>
            <Header />

            <section>
                <Heading tag="h1">Your Journey to Coding Conf 2025 Starts Here!</Heading>
                <p>Secure your spot at next year`s biggest coding conference.</p>
            </section>

            <section>
                <form>
                    <div>
                        <label htmlFor="avatar">Upload avatar</label>
                        <input type="file" id="avatar" />
                    </div>

                    <div>
                        <label htmlFor="full-name">Name</label>
                        <input type="text" id="full-name" />
                    </div>

                    <div>
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" placeholder="example@email.com" />
                    </div>
                    
                    <div>
                        <label htmlFor="github-username">Github Username</label>
                        <input type="text" id="github-username" placeholder="@yourusername" />
                    </div>

                    <button>Generate My Ticket</button>
                </form>
            </section>
        </>
    );
}