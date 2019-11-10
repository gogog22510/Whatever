const blindFunction = (count) => {
    //50 + x^2+0.9487x
    const blindRate = 6 * count * count + 0.9487 * count;
    return Math.min(Math.max(blindRate, 0),100);
};

export default blindFunction