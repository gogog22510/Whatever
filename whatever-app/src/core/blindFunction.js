const blindFunction = (count) => {
    //50 + x^2+0.9487x
    const blindRate = 50 + count * count + 0.9487 * count;
    return Math.max(blindRate, 0);
};

export default blindFunction