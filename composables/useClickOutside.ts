export const useClickOutside = (func, className) => {
    let getParents = function (elem) {
        let parents = [];
        for (; elem && elem !== document; elem = elem.parentNode) {
            parents.push(elem);
        }
        return parents;
    };
    document.addEventListener("click", (e) => {
        if (!getParents(e.target).find((el) => el.classList.contains(className))) {
            func();
        }
    });
};
