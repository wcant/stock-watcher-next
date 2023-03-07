export default function Modal({ children }) {
  return (
    <div className="absolute left-0 top-0 w-screen h-screen flex justify-center items-center">
      <div className="bg-white p-2 border-solid rounded-lg shadow-sm">
        <div>{children}</div>
      </div>
    </div>
  );
}

// .overlay {
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100vw;
//     height: 100vh;
//     background-color: rgba(0, 0, 0, 0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   .modal {
//     width: 500px;
//     background-color: white;
//     padding: 40px;
//     border-radius: 10px;
//     box-shadow: 0 6px 24px 0 rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.08);
//   }
