import React, {HTMLAttributes} from 'react';

export default function View({children, ...props}: HTMLAttributes<HTMLDivElement>){
    return(
        <div {...props}>
            {children}
        </div>
    )
}