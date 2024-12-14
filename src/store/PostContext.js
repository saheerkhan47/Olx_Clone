import React, { createContext, useState } from 'react';

// Create the context
export const PostContext = createContext();

export default function Post({ children }) {
  const [postDetails, setPostDetails] = useState(null);

  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
}
