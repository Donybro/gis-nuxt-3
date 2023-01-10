import { Icon } from '@iconify/vue'
import clsx from 'clsx/dist/clsx'
import { useClickOutside } from '~/composables/useClickOutside'
import HoverGradientBox from '~/components/Cards/HoverGradientBox'

export default defineComponent({
    props: ['menuList'],
    render() {
        return <nav class={'menuList_Wrapper'}>{createMenuList(this.menuList)}</nav>
    },
})

const Dropdown = defineComponent({
    name: 'Dropdown',
    props: {
        placeholder: {
            type: String,
            required: true,
        },
        // path:{
        //     type:String,
        //     required:true
        // },
        isSubtitle: {
            type: Boolean,
            required: false,
        },
        id: {
            type: String,
            required: true,
        },
    },
    components: {
        Icon,
    },
    destroyed() {
        window.removeEventListener('resize', this.onResize)
    },
    data() {
        return {
            dropDownListPosition: '',
            isOpen: false,
            width: 0,
            height: 0,
        }
    },

    mounted() {
        window?.addEventListener('resize', this.onResize)
        this.width = window.innerWidth
        this.height = window.innerHeight
        useClickOutside(() => {
            this.closeDrop()
        }, 'DropDownForClickOutside' + this.id)
    },
    methods: {
        detectDropdownPosition({ clientX: leftDistance, clientY: topDistance }) {
            let resultDropDownPosition = ''

            if (this.height - topDistance < 200) {
                // open top dropdown
                if (this.width - leftDistance < 200) {
                    // open left side
                    resultDropDownPosition = 'topLeftDropdown'
                } else {
                    // open right side
                    resultDropDownPosition = 'topRightDropdown'
                }
            } else {
                // open bottom dropdown
                if (this.width - leftDistance < 200) {
                    // open left side
                    resultDropDownPosition = 'bottomLeftDropdown'
                } else {
                    // not left , not right
                    resultDropDownPosition = 'bottomRightDropdown'
                }
            }
            return resultDropDownPosition
        },
        onResize(e) {
            this.width = window.innerWidth
            this.height = window.innerHeight
        },
        toggleDrop(e) {
            if (!this.isOpen) {
                this.dropDownListPosition = this.detectDropdownPosition(e)
            }
            this.isOpen = !this.isOpen
        },
        closeDrop() {
            this.isOpen = false
        },
    },
    render() {
        return (
            <div className={clsx('relative inline-block flex items-center', 'DropDownForClickOutside' + this.id)}>
                <button
                    id="menu-button"
                    className={clsx(
                        'text-[1em] font-inter inline-flex justify-between items-center w-full',
                        this.isSubtitle === true ? 'text-white' : 'text-text_secondary'
                    )}
                    onClick={(e) => {
                        this.toggleDrop(e)
                    }}
                >
                    {this.placeholder}
                    {this.isOpen ? (
                        <Icon icon="entypo:chevron-up" class={'ml-2'} />
                    ) : (
                        <Icon icon="entypo:chevron-down" class={'ml-2'} />
                    )}
                </button>
                {this.isOpen ? (
                    <div
                        className={clsx('bg-secondary border border-border_primary z-20', this.dropDownListPosition)}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                        onClick={() => this.closeDrop()}
                    >
                        {this.$slots.default()}
                    </div>
                ) : null}
            </div>
        )
    },
})

function createMenuList(list) {
    return list.map((el) => makeDropDown(el))
}

function makeDropDown(item) {
    // const {setCurrentSubmenuId} = useMenuStore()
    const router = useRouter()

    function goToPath(path, id, link) {
        // setCurrentSubmenuId(id)
        // console.log(path)
        if (link) {
            // router.go(link)
            window.open(link, '_blank').focus()
            // window.location.href = link
        } else {
            router.push(path)
        }
    }

    if (item.submenu) {
        return (
            <Dropdown path={item.slug} placeholder={item.title} is-subtitle={!!item?.submenu} id={item.id}>
                {() => <div className={''}> {createMenuList(item.submenu)}</div>}
            </Dropdown>
        )
    } else {
        return (
            <HoverGradientBox>
                <div
                    onClick={() => goToPath(item.slug, item.id, item.link)}
                    className={
                        'py-[12px] px-[16px] bg-secondary hover:bg-primary cursor-pointer text-text_secondary hover:text-white'
                    }
                >
                    {item.title}
                </div>
            </HoverGradientBox>
        )
    }
}
