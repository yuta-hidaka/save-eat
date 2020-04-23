# コロナの影響で困っている飲食店の方々を支援するプロジェクトサイト

# ステップ実行の際には以下を、classやdef中のコードに組み込む。
```
    try:
        ptvsd.enable_attach(address=('0.0.0.0', 9090))
        ptvsd.wait_for_attach()
        ptvsd.break_into_debugger()
        pass
    except:
        pass

```