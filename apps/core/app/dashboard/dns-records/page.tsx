const  DNSRecordsPage = () => {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col gap-4 mt-4">
                <div>
                    <h1 className="text-2xl font-bold"> DNS Records </h1>
                </div>
                <div className="flex gap-5">
                    <div className="flex flex-col gap-5 w-72 h-auto bg-gray-900 rounded-lg p-2 ">
                        <div className="flex items-center justify-between ">
                            <div className="p-1">
                                <p className="text-lg font-normal">Outstanding owed</p>
                                <a className="text-xs font-light underline "> View sales</a>
                            </div>
                            {/* <Infosquareroundedicon /> */}
                        </div>
                        <div>
                            <p className="text-3xl font-bold">$123.00</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-72 h-auto bg-gray-900 rounded-lg p-2 ">
                        <div className="flex items-center justify-between ">
                            <div className="p-1">
                                <p className="text-lg font-normal">Total payout</p>
                                <a className="text-xs font-light underline "> View sales</a>
                            </div>
                            {/* <Infosquareroundedicon /> */}
                        </div>
                        <div>
                            <p className="text-3xl font-bold">$123.00</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-72 h-auto bg-gray-900 rounded-lg p-2 ">
                        <div className="flex items-center justify-between ">
                            <div className="p-1">
                                <p className="text-lg font-normal">Product Count</p>
                                <a className="text-xs font-light underline "> View sales</a>
                            </div>
                            {/* <Infosquareroundedicon /> */}
                        </div>
                        <div>
                            <p className="text-3xl font-bold">$123.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DNSRecordsPage;