import UserService from '@/shared/user-service'
const axiosMock = require('axios')

jest.mock('axios')

describe('UserService', () => {
  let sessionServiceMock
  let userService

  beforeEach(() => {
    sessionServiceMock = {
      loginUser: jest.fn(),
      remove: jest.fn()
    }

    userService = new UserService({ sessionService: sessionServiceMock })
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should save user when logging', async () => {
    const response = { data: { token: 'jwtToken' }}
    axiosMock.post.mockReturnValue(response)

    const request = {
      email: 'test@mail.com',
      password: 'testPassword'
    }
    await userService.login(request)

    expect(axiosMock.post.mock.calls.length).toBe(1)
    expect(axiosMock.post.mock.calls[0][1]).toEqual(request)
    expect(sessionServiceMock.loginUser.mock.calls.length).toBe(1)
    expect(sessionServiceMock.loginUser.mock.calls[0][0]).toBe('jwtToken')
  })

  it('should not save user when error happens', async () => {
    axiosMock.post.mockRejectedValue({ error: 'whatever' })

    const request = {
      email: 'test@mail.com',
      password: 'testPassword'
    }

    try {
      await userService.login(request)
    } catch (ex) {
      expect(ex.error).toBe('whatever')
    }

    expect(axiosMock.post.mock.calls.length).toBe(1)
    expect(axiosMock.post.mock.calls[0][1]).toEqual(request)
    expect(sessionServiceMock.loginUser.mock.calls.length).toBe(0)
  })

  it('should remove user when logging out', async () => {
    axiosMock.delete.mockReturnValue({})

    const user = {
      id: 1
    }
    await userService.remove(user)

    expect(axiosMock.delete.mock.calls.length).toBe(1)
    expect(axiosMock.delete.mock.calls[0][0]).toContain(user.id)
    expect(sessionServiceMock.remove.mock.calls.length).toBe(1)
  })

  it('should not remove user when error happens', async () => {
    axiosMock.delete.mockRejectedValue({ error: 'whatever' })

    const user = {
      id: 1
    }

    try {
      await userService.remove(user)
    } catch(ex) {
      expect(ex.error).toBe('whatever')
    }

    expect(axiosMock.delete.mock.calls.length).toBe(1)
    expect(axiosMock.delete.mock.calls[0][0]).toContain(user.id)
    expect(sessionServiceMock.remove.mock.calls.length).toBe(0)
  })
})
