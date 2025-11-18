'use client';
import { useAtomValue } from 'jotai/react';
import React, { useEffect, useState } from 'react';
import { currentUserAtom } from '../../stores/auth';
import api from '../../lib/axios';
import { AUTH_ENDPOINT } from '../../const/api';

export default function Page() {
  const [profile, setProfile] = useState();
  const currentUser = useAtomValue(currentUserAtom);
  const handleGetProfile = async () => {
    const res = await api.get(`${AUTH_ENDPOINT.GET_PROFILE}`);
    setProfile(res?.data?.data);
  };
  useEffect(() => {
    handleGetProfile();
  }, [currentUser?.id]);
  console.log(profile);
  return <div>profile</div>;
}
