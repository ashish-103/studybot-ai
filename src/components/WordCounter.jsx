import React from 'react'

export default function WordCounter({ text }) {
  return (
    <div className="my-4">Words: {text?.trim().split(/\s+/).filter((word) => word.length > 0).length}</div>
  )
}
