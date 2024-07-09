import { Bar } from "../components/Bar";
import { Form } from "../components/Form";
import { SimpleTag } from "../components/SimpleTag";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

export function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/forum/forums')
            .then(response => {
                setData(response.data.result);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <Bar />
            <div className="container mx-auto py-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Forums</h1>
                    <Link to="/add-discussion">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add Forum
                        </button>
                    </Link>
                </div>
                <div className="flex py-2 border-collapse px-20">
                    <div className="w-1/5 border-2 border-black flex justify-center items-center">
                        <SimpleTag />
                    </div>
                    <div className="w-4/5 border-2 border-black">
                        <Form data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
}
