import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

const UserAvatar = () => {
  const [randomUser, setRandomUser] = useState<{ name: string; avatar: string } | null>(null);

  useEffect(() => {
    setRandomUser({
      name: faker.person.fullName(),
      avatar: `https://robohash.org/${uuidv4()}?set=set2`,
    });
  }, []);

  if (!randomUser) return null; // or a placeholder

  return (
    <div>
      <Image
        src={randomUser.avatar}
        alt="User Avatar"
        className="rounded-full"
        width={48}
        height={48}
      />
      <span className="username">{randomUser.name}</span>
    </div>
  );
};

export default UserAvatar;
