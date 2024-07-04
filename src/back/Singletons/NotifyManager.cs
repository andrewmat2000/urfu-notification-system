namespace BackUrfuNotificationSystem.Singletons;

public enum UpdateType {
  TemplateUploaded,
  GeneralListUploaded,
  OwederListUploaded,
}

public class Update {
  public UpdateType UpdateType { get; set; }
}

public class NotifyManager {
  public byte[] Doc { get => _doc; set => _doc = value; }
  public IReadOnlyDictionary<string, byte[]> Docs { get; set; } = new Dictionary<string, byte[]>();

  private readonly List<Update> _updates = [];
  private readonly Mutex _mutex = new();
  private byte[] _doc = [];
  private readonly List<(string name, byte[] data)> _docs = [];

  public IReadOnlyCollection<Update> GetUpdates() {
    var copy = _updates.ToArray();
    _updates.Clear();

    return copy;
  }

  public void AddUpdate(Update update) {
    lock (_mutex) {
      _updates.Add(update);
    }
  }
}