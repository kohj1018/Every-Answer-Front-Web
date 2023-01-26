
/** 특수문자 검사 함수 (괜찮으면 true 반환) */
export function checkCharacter(
  text: string,
  includeSpace: boolean,
  setMessage: (message: string) => void,
  setIsSnackbarOpen: (isSnackbarOpen: boolean) => void): boolean
{
  const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi
  const regExpWithoutSpace = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi

  if (includeSpace) {
    if (regExp.test(text)) {
      ;(async () => {
        await setMessage("특수 문자, 공백은 입력하실 수 없습니다.")
        await setIsSnackbarOpen(true)
      })()
      return false
    }
  } else {
    if (regExpWithoutSpace.test(text)) {
      ;(async () => {
        await setMessage("특수 문자는 입력하실 수 없습니다.")
        await setIsSnackbarOpen(true)
      })()
      return false
    }
  }

  return true
}