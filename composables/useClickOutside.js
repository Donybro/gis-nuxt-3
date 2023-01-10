export const useClickOutside = (func, className) => {
	var getParents = function (elem) {
		var parents = []
		for (; elem && elem !== document; elem = elem.parentNode) {
			parents.push(elem)
		}
		return parents
	}
	document.addEventListener('click', (e) => {
		if (!getParents(e.target).find((el) => el.classList.contains(className))) {
			func()
		}
	})
}
