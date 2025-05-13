import React from 'react';

const headerTable = ['ID', 'Name', 'Phone Number', 'Type', 'Identity Number'];

const TableListIdentity = () => {
    return (
        <div className="max-w-full rounded-lg border border-neutral-100 bg-white">
            <table className="h-fit w-full border-collapse">
                <thead>
                    <tr className="[&>td]:border [&>td]:border-neutral-100">
                        {headerTable.map(data => (
                            <th
                                scope="col"
                                className="px-[14px] py-5 text-left text-text-md font-semibold text-neutral-800"
                                key={data}
                            >
                                {data}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* {userState?.list?.loading ? (
                        <tr className="border border-neutral-50">
                            {headerTable.map(data => (
                                <td className="px-[14px]" key={data}>
                                    <div
                                        role="status"
                                        className="max-w-full animate-pulse"
                                    >
                                        <div className="mb-4 h-2.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-700" />
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ) : userState.list.data.data ? (
                        userState.list.data.data.map((data: any) => (
                            <tr
                                key={data.email}
                                className="cursor-pointer text-text-sm font-medium hover:bg-neutral-50 [&>td]:border-y [&>td]:border-neutral-100 [&>td]:px-[14px] [&>td]:py-5"
                                onClick={() =>
                                    router.push(`/user/detail/${data._id}`)
                                }
                            >
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.role.name}</td>
                                <td>
                                    <div className="row-auto flex gap-3">
                                        <Image
                                            src={
                                                data.country?.image
                                                    ?.completedUrl
                                            }
                                            alt={data.country?.name}
                                            width={16}
                                            height={16}
                                        />
                                        <div>{data.country?.name}</div>
                                    </div>
                                </td>
                                <td>
                                    <BadgeStatus status={data.status} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={headerTable.length}>
                                No Data to display
                            </td>
                        </tr>
                    )} */}

                    <tr className="cursor-pointer text-text-sm font-medium hover:bg-neutral-50 [&>td]:border-y [&>td]:border-neutral-100 [&>td]:px-[14px] [&>td]:py-5">
                        <td>ID0001</td>
                        <td>John Doe</td>
                        <td>0812345678</td>
                        <td>KTP</td>
                        <td>367140929283838383</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableListIdentity;
