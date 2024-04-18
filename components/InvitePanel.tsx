import { useCallback, useEffect, useState } from 'react';

import { Icon } from '@stream-io/video-react-sdk';

export const Invite = () => {
  const { isCopied, copyInviteLink } = useCopyInviteLink();
  return (
    <div className="bg-dark-1 text-sm p-3 w-[200px] rounded-lg">
      <h2 className="text-white font-bold text-lg">Share the link</h2>
      <p className="text-xs text-gray-400">
        Click the button below to copy the call link:
      </p>
      <button
        className="flex w-full bg-blue-1 p-2 gap-1 justify-center items-center text-white font-semibold rounded-xl"
        onClick={copyInviteLink}
      >
        <Icon className="" icon="person-add" />
        
        {isCopied ? 'Copied invite link' : 'Copy invite link'}
      </button>
    </div>
  );
};

export const InvitePanel = () => {
  
  return (
    <div className="">
      <Invite />
      
    </div>
  );
};

const useCopyInviteLink = () => {
  const [isCopied, setIsCopied] = useState(false);
  const copyInviteLink = useCallback(() => {
    setIsCopied(false);
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .catch((err) => console.error('could not copy invite link', err))
      .finally(() => setIsCopied(true));
  }, []);

  useEffect(() => {
    if (!isCopied) return;
    const id = setTimeout(() => {
      setIsCopied(false);
    }, 3000);
    return () => clearTimeout(id);
  }, [isCopied]);

  return { isCopied, copyInviteLink };
};