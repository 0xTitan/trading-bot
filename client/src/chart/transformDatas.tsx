const transformDataForChart = (pairs: any[]) => {
    const data = pairs.map((pair) => ({
        x: new Date(pair.timestamp * 1000), // Convert timestamp to Date object
        y: pair.price,
    }));

    return {
        datasets: [
            {
                label: 'Price',
                data,
                borderColor: '#007bff',
                backgroundColor: 'transparent',
            },
        ],
    };
};

export default transformDataForChart;