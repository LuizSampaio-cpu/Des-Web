import handlers from "../basic";
import {expect, jest, test} from "@jest/globals"

test('renderizador da página principal', () => {
    const req = {}
    const res = {render: jest.fn()}
    handlers.home(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('home')
})


test('renderizador da página sobre', () => {
    const req = {}
    const res = {render: jest.fn()}
    handlers.sobre(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('sobre')
})


test('renderizador da página não emcontrada', () => {
    const req = {}
    const res = {render: jest.fn()}
    handlers.notFound(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('4-4')
})


test('renderizador de erro no servidor', () => {
    const req = {}
    const res = {render: jest.fn()}
    handlers.serverError(err, req, res, next)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('500')
})