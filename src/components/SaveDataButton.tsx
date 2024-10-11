
const SaveDataButton = () => {
    function getData(){
       const data:any = localStorage.getItem('gym-tracker')
       throw new Error(data)
    }
  return (
    <button onClick={getData} className=" m-auto border-black px-4 py-2 bg-black text-white">save existing data</button>
  )
}

export default SaveDataButton