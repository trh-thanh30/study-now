'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button, Input, Modal } from '../../ui';
import useAuth from '../../../hooks/use-auth';

export default function ProfileView() {
  const [isOpenNotiSubscription, setIsOpenNotiSubscription] = useState<boolean>(false);
  const { user, handleGetProfile, handleSignOut } = useAuth();
  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <>
      <div className="w-[95%] sm:w-[50%] mx-auto py-14 sm:py-5">
        <div className="mt-10">
          <h1 className="text-3xl font-semibold text-amber-950">My Profile</h1>
          <div className="space-y-8 max-w-2xl mx-auto  mt-10">
            <div className="bg-white rounded-md py-5 px-7">
              <h2 className="text-base font-semibold text-amber-950">Account Information</h2>
              <div className="flex items-center gap-8 mt-5">
                {user && user.picture && (
                  <Image
                    src={user?.picture}
                    alt="user_image"
                    width={500}
                    height={500}
                    className="rounded-full object-cover w-16 h-16"
                  />
                )}
                <div className="space-y-2">
                  <p className="text-lg  text-amber-950 font-semibold">{user?.username}</p>
                  <p className="text-sm font-medium text-amber-950">{user?.email}</p>
                  <p className="text-sm font-medium text-amber-950">{user?.created_at}</p>
                  <button className="border border-gray-300 rounded-md py-1 px-3 hover:cursor-pointer">
                    <span className="text-sm text-gray-800">Edit profile</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md py-5 px-7">
              <h2 className="text-base font-semibold text-amber-950">Subscription</h2>

              <div className="space-y-4 mt-5">
                <p className="text-lg  text-gray-600 font-semibold">
                  You are currently on the Free plan.
                </p>
                <p className="text-sm font-medium text-gray-600 ">
                  Upgrade to Pro for advanced features and unlimited usage.
                </p>
                <Button
                  onClick={() => setIsOpenNotiSubscription((prev) => !prev)}
                  size="sm"
                  title="Upgrade to Pro"
                  color="#333"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            <div className="bg-white rounded-md py-5 px-7">
              <h2 className="text-base font-semibold text-amber-950">Account Actions</h2>

              <button
                onClick={handleSignOut}
                type="button"
                className="text-sm font-medium hover:underline mt-5 hover:cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal opened={isOpenNotiSubscription} onClose={() => setIsOpenNotiSubscription(false)}>
        <h3 className="text-center text-2xl font-semibold text-gray-900">Coming Soon</h3>
        <p className="text-sm text-center font-medium text-gray-500 mt-2">
          We are working hard to bring you something amazing.
        </p>

        <form className="space-y-3.5 mt-6">
          <Input size="sm" type="text" label="Email" />
          <Button
            size="sm"
            type="submit"
            title="Notify Me"
            color="#333"
            style={{ width: '100%' }}
          />
        </form>
        <p className="text-xs text-gray-800 mt-5 text-center">
          Your email will only be used to notify you when the application is ready.
        </p>
      </Modal>
    </>
  );
}
