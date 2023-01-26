export function checkMaxLength(object: any) {
  console.log("object : ", object, " | type : ", typeof object)
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength)
  }
}