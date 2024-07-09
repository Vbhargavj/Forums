import { useParams } from "react-router-dom";
import { Bar } from "../components/Bar";
import { useState, useEffect } from 'react';
import axios from 'axios';
import mainUrl from '../utils/constant';

function timeAgo(timestamp) {
    console.log(timestamp);
    const now = Date.now();
    const secondsPast = (now - new Date(timestamp)) / 1000;
    console.log(secondsPast);
    if (secondsPast < 60) {
        return `${Math.round(secondsPast)} seconds ago`;
    } else if (secondsPast < 3600) {
        return `${Math.round(secondsPast / 60)} minutes ago`;
    } else if (secondsPast < 86400) {
        return `${Math.round(secondsPast / 3600)} hours ago`;
    } else {
        return `${Math.round(secondsPast / 86400)} days ago`;
    }
}

export function ForumPage() {
    const { id } = useParams();
    const [forum, setForum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(1);

    useEffect(() => {
        axios.get(`${mainUrl}/api/v1/forum/getforum/${id}`)
            .then(response => {
                setForum(response.data.result);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching forum data:', error);
                setError(error);
                setLoading(false);
            });
    }, [id]);

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        axios.post(`${mainUrl}/api/v1/review/${id}`, {
            review: newReview,
            rating,
        })
        .then(response => {
            setForum(prevForum => ({
                ...prevForum,
                reviews: [...(prevForum.reviews || []), response.data.data.review],
            }));
            setNewReview('');
            setRating(1);
            // window.location.reload(); // Refresh the page to show the new review
        })
        .catch(error => {
            console.error('Error adding review:', error);
            setError(error);
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading forum data</p>;

    const reviews = forum.reviews || [];

    return (
        <div>
            {console.log("re render")}
            <Bar />
            <div className="container">
                <div className="p-5 h-20 bg-green-700 flex flex-col justify-center items-center">
                    <span className="px-1 text-lg bg-slate-100 rounded">{forum.tag.name}</span>
                    <div className="p-1 text-xl text-slate-100">{forum.title}</div>
                </div>
                <div className="mx-12 mt-5 p-2 flex border-2 border-black">
                    <div className="w-2/11 m-2">
                        <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center">
                            <div className="text-xl">{forum.user.name.charAt(0)}</div>
                        </div>
                    </div>
                    <div>
                        <div className="ms-2">{forum.user.name} {timeAgo(forum.createdAt)}</div>
                        <div className="ps-4 mt-2 mb-2 text-xl font-bold">{forum.title}</div>
                        <div className="ps-4 mt-2">{forum.description}</div>
                    </div>
                </div>
                <div className="my-5 mx-12">
                    <h2>Reviews</h2>
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <div key={review._id} className="border-t border-gray-300 py-2">
                                <div>{review.user.name}: {review.review} (Rating: {review.rating})</div>
                                <div className="text-sm text-gray-600">{timeAgo(new Date(review.createdAt))}</div>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
                <form onSubmit={handleReviewSubmit} className="mx-12">
                    <textarea
                        value={newReview}
                        onChange={(e) => { e.preventDefault(); setNewReview(e.target.value) }}
                        placeholder="Write your review"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                    <div className="mt-2">
                        <label htmlFor="rating">Rating:</label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Submit Review</button>
                </form>
            </div>
        </div>
    );
}
