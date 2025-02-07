import React from 'react'

export const WordCounter = ({ text }) => {
  return (
    <div className="my-4">Words: {text?.trim().split(/\s+/).filter((word) => word.length > 0).length}</div>
  )
}