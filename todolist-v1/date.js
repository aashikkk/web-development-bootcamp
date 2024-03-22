// Using array function
exports.getDate = () => {
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    const today = new Date();

    return today.toLocaleDateString("en-US", options);
};

exports.getDay = function () {
    const options = {
        weekday: "long",
    };
    const today = new Date();

    return today.toLocaleDateString("en-US", options);
};
