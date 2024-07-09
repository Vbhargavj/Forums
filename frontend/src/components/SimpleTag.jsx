import  { useEffect, useState } from 'react';
import { Tag } from './Tag';
import mainUrl from '../utils/constant';

export function SimpleTag() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        async function fetchTags() {
            try {
                const response = await fetch(`${mainUrl}/api/v1/tag/getall`); // Replace with your backend endpoint
                const data = await response.json();
                console.log(data);
                setTags(data.data.doc);
            } catch (error) {
                console.error('Error fetching tags:' );
            }
        }
        fetchTags();
    }, []);

    return (
        <div className="flex flex-col space-y-3 justify-center items-center">
            {tags.map((tag) => (
                <Tag key={tag._id} name={tag.name} color={tag.color} />
            ))}
        </div>
    );
}
