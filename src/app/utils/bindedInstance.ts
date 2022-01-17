const bindedInstance = <T>(ClassObject: new (...args: any[]) => T): T => {
  const instance: { [key: string]: any } = new ClassObject();

  Object.getOwnPropertyNames(ClassObject.prototype).forEach((method) => {
    if (instance[method].bind) instance[method] = instance[method].bind(instance);
  });

  return instance as T;
};

export default bindedInstance;
