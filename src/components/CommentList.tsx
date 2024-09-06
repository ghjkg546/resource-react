// src/components/CommentList.tsx
import React, {  useState } from 'react';
import { CommentEntity } from '../interface/CommonListItem';


// Define the types for the comments


// Define the type for the comment options
interface CommentOption {
    value: string;
    label: string;
}


interface CommentProps {
    comments:CommentEntity[];
    postId: number;
    onSendComment: (content: string) => void;
  }

const CommentList: React.FC<CommentProps> = ({ comments,postId,onSendComment }) => {
    console.log("postid",postId)
    const [selectedOption, setSelectedOption] = useState<string>('all');
    
   
    
  
    // Define the options for the select list
    const options: CommentOption[] = [
        { value: '楼主好人一生平安', label: '楼主好人一生平安' },
        { value: '这是我苦苦求的资源呀', label: '这是我苦苦求的资源呀' },

    ];
    
    // Function to handle option change
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
        onSendComment(event.target.value);
    };
    

    return (
        <div className="flex flex-col items-center p-4 min-w-full">
            <h1 className="text-2xl font-bold mb-4">Comments</h1>
            <select
                value={selectedOption}
                onChange={handleChange}
                className="mb-4 p-2 border border-gray-300 rounded min-w-full"
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ul className="list-none p-0 min-w-full">
                {comments.map(comment => (

                    <div className="mx-auto border px-6 py-4 rounded-lg">
                        <div className="flex items-center mb-6">
                            <img
                                src="https://randomuser.me/api/portraits/men/97.jpg"
                                alt="Avatar"
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <div className="text-sm font-medium text-gray-800">{comment.user.name}</div>
                                {/* <div className="text-gray-500">2 hours ago</div> */}
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-6">
                        {comment.content}
                        </p>
                        
                    </div>

                ))}
            </ul>
        </div>
    );
};

export default CommentList;
