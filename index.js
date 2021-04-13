/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (properties, objects) => {
    properties.forEach(property => {
        objects.forEach(obj => {
            delete obj[property];
        });
    });
    return objects;
};
exports.excludeByProperty = (property, objects) => {
    return objects.filter(obj => {
        return !obj?.hasOwnProperty?.(property);
    });
};
exports.sumDeep = (inputs) => {
    return inputs.map(input => {
        const output = {};
        Object.entries(input).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                output[key] = value.reduce((aggregate, subObj) => {
                    // assume that anything that isn't an object or doesn't have .val, has a value of 0
                    const subVal = subObj?.val || 0;
                    return aggregate + subVal;
                }, 0);
            } else {
                output[key] = value;
            }
        });
        return output;
    });
};
exports.applyStatusColor = (codeColors, statusObjects) => {
    const output = [];
    statusObjects.forEach(statusObj => {
        const code = statusObj?.status;
        const color = Object.keys(codeColors).find(key => {
            return codeColors[key].includes(code);
        });
        if (code && color) {
            output.push({
                status: code,
                color
            });
        }
    });
    return output;
};
exports.createGreeting = (greetingFn, ...presets) => {
    return (...greetingArgs) => greetingFn(...presets, ...greetingArgs);
};
exports.setDefaults = (defaults) => {
    return (obj) => {
        Object.entries(defaults).forEach(([key, value]) => {
            if (obj[key] === undefined) {
                obj[key] = value;
            }
        });
        return obj;
    };
};
exports.fetchUserByNameAndUsersCompany = async (userName, services) => {
    const [users, status] = await Promise.all([services.fetchUsers(), services.fetchStatus()]);
    const user = users.find(u => u.name === userName);
    if (!user) {
        return;
    }
    const company = await services.fetchCompanyById(user.companyId);
    return {
        user,
        status,
        company
    };
};
