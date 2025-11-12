'use client'
import Link from "next/link";
import React, { useState } from "react";

// MazaPay API Documentation Page (UI Design using endpoints data)
const endpoints = [
  {
    id: "create-payment",
    title: "Create Payment",
    method: "POST",
    path: "https://mazapayserver.onrender.com/api/payments/create",
    description: "Create a payment session and return a payment id or redirect URL.",
    request: {
      headers: ["x-api-key:  <API_KEY>", "Content-Type: application/json"],
      body: {
        amount: "number",
      }
    },
    response: {
      status: "number",
     message:"string",
     item:{
      paymentId:"string",
      amount:"number",
      userId:"string",
      url:"string"
     }
    },
    examples: {
      curl: "curl example string",
      javascript: "fetch example string"
    }
  },
 
];

export default function MazaPayAPIDocs() {
  const [selected, setSelected] = useState(endpoints[0].id);
  const [tab, setTab] = useState("curl");

  const selectedEndpoint = endpoints.find(e => e.id === selected);

  if (!selectedEndpoint) return null;

  return (
    <div className="min-h-screen  text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3">
          <div>
            <h1 className="text-3xl font-extrabold">mazaPay API Docs</h1>
            <p className="text-gray-400 text-sm mt-1">Developer portal • REST API • v1</p>
          </div>
          <Link href={"/main/api"} className="px-4 py-2 bg-pink-600 hover:bg-green-700 rounded-md text-sm font-medium">Generate API Key</Link>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-3 bg-gray-900 shadow-lg rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3 text-gray-300">Endpoints</h3>
            <nav className="flex flex-col gap-2">
              {endpoints.map(ep => (
                <button
                  key={ep.id}
                  onClick={() => setSelected(ep.id)}
                  className={`text-left px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm flex items-center justify-between ${selected === ep.id ? "bg-pink-600 text-white" : "text-gray-200"}`}
                >
                  <div>
                    <div className="font-medium">{ep.title}</div>
                    <div className="text-xs text-gray-400">{ep.path}</div>
                  </div>
                  <div className="ml-3 text-xs font-mono">{ep.method}</div>
                </button>
              ))}
            </nav>

            <div className="mt-6 text-xs text-gray-400">
              <div className="font-semibold mb-1">Rate Limit</div>
              <div>100 requests / minute per API key</div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-9">
            <div className="bg-gray-900 shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-2 text-pink-400">{selectedEndpoint.title}</h2>
              <p className="text-sm text-gray-300 mb-4">{selectedEndpoint.description}</p>

              <div className="mb-4">
                <span className="px-2 py-1 rounded-md bg-gray-700 font-mono text-sm mr-2">{selectedEndpoint.method}</span>
                <span className="font-mono text-sm text-gray-300">{selectedEndpoint.path}</span>
              </div>

              <section className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 text-gray-300">Request</h4>
                  {selectedEndpoint.request.headers && (
                    <div className="text-xs text-gray-400 mb-2">
                      Headers:
                      <pre className="bg-gray-800 rounded-md p-2 mt-1 text-xs">
                        <code>{selectedEndpoint.request.headers.join('\n')}</code>
                      </pre>
                    </div>
                  )}
                  {selectedEndpoint.request.body && (
                    <div className="text-xs text-gray-400 mb-2">
                      Body:
                      <pre className="bg-gray-800 rounded-md p-2 mt-1 text-xs overflow-auto">
                        <code>{typeof selectedEndpoint.request.body === 'string' ? selectedEndpoint.request.body : JSON.stringify(selectedEndpoint.request.body, null, 2)}</code>
                      </pre>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2 text-gray-300">Response</h4>
                  <pre className="bg-gray-800 rounded-md p-2 text-xs overflow-auto">
                    <code>{typeof selectedEndpoint.response === 'string' ? selectedEndpoint.response : JSON.stringify(selectedEndpoint.response, null, 2)}</code>
                  </pre>
                </div>
              </section>

              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <button className={`px-3 py-1 rounded-md text-sm ${tab === 'curl' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-200'}`} onClick={() => setTab('curl')}>cURL</button>
                  <button className={`px-3 py-1 rounded-md text-sm ${tab === 'javascript' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-200'}`} onClick={() => setTab('javascript')}>JavaScript</button>
                </div>
                <pre className="bg-black text-green-400 rounded-md p-3 text-xs overflow-auto">
                  <code>{selectedEndpoint?.examples[tab as keyof typeof selectedEndpoint.examples]}</code>
                </pre>
              </div>

              <div className="mt-6 text-gray-400 text-sm">
                <h4 className="font-medium mb-1">Adding API Key to your website:</h4>
                <p className="mb-2">Use the generated API key in your headers as <code>Authorization: Bearer &lt;API_KEY&gt;</code> when calling the MazaPay gateway from your website.</p>
                <p>Example using JavaScript fetch:</p>
                <pre className="bg-gray-800 rounded-md p-2 mt-1 text-xs overflow-auto">
                  <code>{`fetch('https://mazapayserver.onrender.com${selectedEndpoint.path}', {
  method: '${selectedEndpoint.method}',
  headers: {
    'x-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({/* your request body */})
})`}</code>
                </pre>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}