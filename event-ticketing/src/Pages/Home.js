import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";

export default function Home() {
    const {user} = useContext(AppContext);
    return (
        <h1>Home Page {user}</h1>
    );
}