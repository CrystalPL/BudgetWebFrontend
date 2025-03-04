import React from 'react';
import {Box} from '@mui/material';

interface AvatarImageProps {
    src: string;
    reloadKey: string | number;
    onClick: () => void;
    popoverController: {
        handleOpen: () => void;
        anchorElement: React.RefObject<HTMLDivElement>;
    };
}

const AvatarImage: React.FC<AvatarImageProps> = ({src, reloadKey, onClick, popoverController}) => {
    return (
        <Box
            key={reloadKey}
            onClick={onClick}
            ref={popoverController.anchorElement}
            sx={{
                cursor: 'pointer',
                width: 50,
                height: 50,
                borderRadius: '50%',
                overflow: 'hidden',
            }}
        >
            <img
                src={src}
                alt="User Avatar"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
        </Box>
    );
};

export default AvatarImage;
