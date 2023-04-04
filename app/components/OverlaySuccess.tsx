"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import useSWR from "swr";
import { Spinner } from "flowbite-react";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function OverlaySuccess({ email }: any) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/${email}`,
    fetcher
  );
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Congratulations, you are now a member!
                      </Dialog.Title>
                      <div className="mt-2">
                        {!data ? (
                          <p className="text-sm text-gray-700">
                            Please wait while we are preparing your dashboard!
                          </p>
                        ) : (
                          <div>
                            <p className="text-sm text-gray-500">
                              Your dashboard is now ready.
                            </p>
                            <p className="text-sm text-green-500 mt-2">
                              Vist your dashboard to start monitoring your
                              accounts, deposits, transfers, payments and
                              transactions history.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {!data ? (
                    <button
                      disabled={true}
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                    >
                      <Spinner aria-label="Spinner button example" />
                      <span className="pl-3">Loading...</span>
                    </button>
                  ) : (
                    <form action={`/dashboard/${data.id}`}>
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      >
                        View my dashboard
                      </button>
                    </form>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
