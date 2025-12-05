import GameOfTheDay from "./GameOfTheDay";
import RandomGames from "./RandomGames";

export default function Home (props) {
    return <div>
        <h1>Home Page</h1>
        <p>Welcome to the Game Index! You can browse games by console using the dropdown in the navigation bar.</p>
        <p>Here are a couple games to get you started, maybe you've seen them before or maybe they're new, either way check em out!</p>
        <GameOfTheDay />
        <RandomGames/>
    </div>
}