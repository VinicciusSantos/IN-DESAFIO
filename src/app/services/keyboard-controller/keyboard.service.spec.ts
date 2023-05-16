import KeyboardService, { KeyboardAction } from './keyboard.service';

describe('KeyboardService', () => {
  let service: KeyboardService;
  let mockEventAction1 = jest.fn();
  let mockEventAction2 = jest.fn();
  let mockEventAction3 = jest.fn();
  const actions: KeyboardAction[] = [
    { key: 'a', action: mockEventAction1 },
    { key: 'b', action: mockEventAction2, worksInInput: true },
    { key: 'c', action: mockEventAction3, freezeInOverlay: true },
  ];

  beforeEach(() => {
    service = new KeyboardService();
    service.setActions(actions);
    service.initActions();
  });

  afterEach(() => {
    window.removeEventListener('keydown', () => {});
    service.endActions();
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createActions()', () => {
    it('should add keyboard actions in activedActions', async () => {
      expect(service.actions).toEqual(actions);
    });

    it('should add keyboard actions in event listners', async () => {
      window.removeEventListener('keydown', () => {});
      const spyAddEventListener = jest.spyOn(window, 'addEventListener');
      service.setActions(actions);
      service.initActions();
      expect(spyAddEventListener).toBeCalledTimes(actions.length);
      expect(spyAddEventListener).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );
    });
  });

  describe('removeActions()', () => {
    it('should remove keyboard actions and event listeners', () => {
      const removeSpy = jest.spyOn(window, 'removeEventListener');
      service.endActions();
      expect(removeSpy).toBeCalledTimes(actions.length);
    });
  });

  describe('handleKeyboardEvent', () => {
    const dispatchKeyboardEvent = (key: string) => {
      service['handleKeyboardEvent'](
        new KeyboardEvent('keydown', { key }),
        actions.find(action => action.key === key) as KeyboardAction
      );
    };

    it('should call action when keydown', async () => {
      dispatchKeyboardEvent('a');
      expect(mockEventAction1).toHaveBeenCalledTimes(1);
      expect(mockEventAction2).toHaveBeenCalledTimes(0);
    });

    it('should not do action if input is in focus', async () => {
      const input = document.createElement('input');
      document.body.append(input);
      dispatchKeyboardEvent('a');
      input.focus();
      dispatchKeyboardEvent('a');
      expect(mockEventAction1).toHaveBeenCalledTimes(1);
      document.body.removeChild(input);
    });

    it('should do action if input is in focus and worksInInput is true', async () => {
      const input = document.createElement('input');
      document.body.append(input);
      dispatchKeyboardEvent('b');
      input.focus();
      dispatchKeyboardEvent('b');
      expect(mockEventAction2).toHaveBeenCalledTimes(2);
      document.body.removeChild(input);
    });

    it('should do action if overlay is in screen', async () => {
      const div = document.createElement('div');
      div.classList.add('modal-container');
      document.body.append(div);
      dispatchKeyboardEvent('a');
      expect(mockEventAction1).toHaveBeenCalledTimes(1);
      document.body.removeChild(div);
    });

    it('should not do action if freezeInOverlay is true and overlay is in screen', async () => {
      const div = document.createElement('div');
      div.classList.add('modal-container');
      document.body.append(div);
      dispatchKeyboardEvent('c');
      expect(mockEventAction3).toHaveBeenCalledTimes(0);
      document.body.removeChild(div);
    });
  });
});
