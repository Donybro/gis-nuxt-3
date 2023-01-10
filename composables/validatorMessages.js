export default function useValidatorMessages() {
    const { t: $t } = useI18n({ useScope: 'global' })

    const requiredValidatorMessage = ({ path }) => {
        return $t('validator.field-required')
    }
    const siteValidatorMessage = () => {
        return $t('validator.site-not-valid')
    }
    const emailValidatorMessage = () => {
        return $t('validator.wrong-email')
    }
    const minValidatorMessage = (args) => {
        return $t('validator.minLength', { min: args.min })
    }
    const maxValidatorMessage = (args) => {
        return $t('validator.maxLength', { max: args.max })
    }
    const onlyLatinLetters = (args) => {
        return $t('validator.only-latin')
    }
    const fileSize = (args, { size }) => {
        return $t('validator.file-size', { size: size })
    }
    const fileType = (args, { type }) => {
        return $t('validator.file-type', { type: type })
    }
    function checkIfFilesAreTooBig(files) {
        let valid = true
        if (files) {
            files.map((file) => {
                const size = file.size / 1024 / 1024
                if (size > 1) {
                    valid = false
                }
            })
        }
        return valid
    }
    function checkIfFileIsTooBig(file) {
        let valid = true
        if (file?.file) {
            const size = file?.file?.size / 1024 / 1024
            if (size > 10) {
                valid = false
            }
        }
        return valid
    }
    function checkIfFilesAreCorrectType(files) {
        let valid = true
        if (files) {
            files.map((file) => {
                if (!['application/pdf'].includes(file.type)) {
                    valid = false
                }
            })
        }
        return valid
    }
    function checkIfFileIsCorrectType(file) {
        let valid = true
        if (file?.file) {
            if (!['application/pdf'].includes(file.file.type)) {
                valid = false
            }
        }
        return valid
    }

    return {
        requiredValidatorMessage,
        emailValidatorMessage,
        minValidatorMessage,
        maxValidatorMessage,
        onlyLatinLetters,
        fileSize,
        fileType,
        checkIfFilesAreTooBig,
        checkIfFileIsTooBig,
        checkIfFilesAreCorrectType,
        checkIfFileIsCorrectType,
        siteValidatorMessage,
    }
}
