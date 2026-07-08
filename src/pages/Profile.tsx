import MainLayout from "../components/layout/MainLayout";

export default function Profile() {
  return (
    <MainLayout>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white mb-8">
        <h1 className="text-4xl font-bold">
          Raavi Hema
        </h1>

        <p className="mt-2">
          Project Manager
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label>Name</label>

            <input
              value="Raavi Hema"
              className="w-full border rounded-xl p-3 mt-2"
              readOnly
            />
          </div>

          <div>
            <label>Email</label>

            <input
              value="hravi6036@gmail.com"
              className="w-full border rounded-xl p-3 mt-2"
              readOnly
            />
          </div>

          <div>
            <label>Role</label>

            <input
              value="Project Manager"
              className="w-full border rounded-xl p-3 mt-2"
              readOnly
            />
          </div>

          <div>
            <label>Phone</label>

            <input
              value="+91 XXXXXXXXXX"
              className="w-full border rounded-xl p-3 mt-2"
              readOnly
            />
          </div>

        </div>

      </div>

    </MainLayout>
  );
}