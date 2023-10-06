'use client'

import * as React from "react";




const AnimatedView = ({



  children,
}: {

  children: React.ReactNode;
}) => {
  return (

      <div className="relative">
        
          {children}
        
      </div>

  );
};

export default AnimatedView;
