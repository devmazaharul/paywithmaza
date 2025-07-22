
export default function Choosecard({icon,title,tag}:{icon:React.ReactNode,title:string,tag:string}) {
  return (
    <div className="text-center w-full mx-auto border border-gray-600 shadow-2xl rounded-2xl p-5 hover:bg-gray-700">
        <p >  {icon}</p>
          <h1 className="text-3xl font-bold py-2">{title}</h1>
          <p>{tag}</p>
    </div>
  )
}
